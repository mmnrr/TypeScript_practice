//"따로 코드를 언급하지 않고 전체적인 맥락을 설명할 때 코드 가장 맨 위에 적기."
//--
//----
// templateElement가 콘텐츠를 임포트 해야한다. 
// 그 다음 DOM에 렌더링해야 하기.




//00/
class ProjectInput {

    //03/
    templateElement : HTMLTemplateElement; 
    // <template id="project-input">
    // Property ... does not exist on type --> 클래스 안에 필드를 만들기
    // Type null is not assignable to type --> !    
    //04/
    hostElement : HTMLDivElement;

    // <div id="app"></div>

    element: HTMLFormElement;
    

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    // 2. templateElement가 콘텐츠를 임포트 해야한다. 
    // 그 다음 DOM에 렌더링해야 하기.

    //01/
    constructor () {
    //----


        // DOM 요소와 상호 작용 (4번째)
        // 웹 입력칸 여기 양식이 있기 떄문에 
        // 거기 있는 다양한 <input> 에 액세스해서 양식이 제출되면
        // 값을 읽고 제출에 이벤트 리스너를 설정해서 사용자 입력을 검증하기.
        // 그럼 우린 제출 액션을 정취하기 위해 버튼 또는 전체 양식에 액세스해야 하고
        // 모든 <input>요소에 액세스 해서 거기에 최신 값을 받기

        //02/
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        // getElementById 는 HTML이 안에 들어올 것을 알 뿐이며 어떤 요소가 들어올지는 모른다. div,p,button,template...
        // 따라서 타입을 지정하기 '타입 변환' --> as HTMLTemplateElement, <HTMLTemplateElement>
        // 이? 콘텐츠를 담고 있는 템플릿에 대한 액세스
        // Property ... does not exist on type
        // document.getElementById() 는 빈칸 문자열에 일치하는 id속성(요소) 찾고, element 객체를 반환함.

        //05/
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        // 템플릿 콘텐츠를 렌더링하려는 요소에 대한 참조
        // <div id="app"></div> 

        //06/
        const importedNode = document.importNode(this.templateElement.content, true);
        // 2. templateElement가 콘텐츠를 임포트 해야한다. 
        // 그 다음 DOM에 렌더링해야 하기.
        // importNode() 는 전역 Document 객체가 제공하는 메서드예요.
        // 여기에 this.templateElement를 넣는 것이다. 
        // .content : content는 HTMLTemplateElement에 존재하는 속성이다. 
        // 간단히 템플릿에 대한 참조를 제공해줌.
        // 즉, template 태그들 사이에 있는 HTML 코드에 대한 참조를 제공.
        // importNode()는 둘째 인수도 취하는데 이건 깊은 복사
        // 즉 템플릿 안의 모든 중첩된 수준을 임포트할지를 말하는 것. true

        // document.importNode 의 첫 인수는 클래스 필드를 지정하며 <template>,
        // 두번쨰는 자식노드를 참조하느냐. 즉, <template>이 DocumentFragment를 갖고
        // 그 안에 저장된 컨텐츠를 .content으로 접근.

        //12/
        this.element = importedNode.firstElementChild as HTMLFormElement;
        // HTML의 구체적인 위치를 가리켜야 한다. 그래서 HTMLEle -> HTMLFormEle

        // firstElementChild : js , element node를 반환, html코드 접근할 떄 씀,
        // importedNode에 .content가 많아. 그것 첫 타자 쓰자.

        //13/
        this.element.id = 'user-input';

        //14/
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        // 2?
        // document.getElementById 에서와 마찬가지로 
        // 타입스크립트는 이 querySelector()가 필드의 이? InputElement를 리턴할지 알 수 없습니다.
        // 그래서 타입 캐스팅 적용하기  
        // 이제 우리의 요소, <form>에 리스너만 추가하면 됨.
        // 그걸 하기 위해 configure()
        // querySelector 는 괄호 속 element를 ㅁ반환.

        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        //16/
        this.configure();
        
        //10/
        this.attach();
    }
    private submitHandler(event: Event) {
        event.preventDefault();
        // event.preventDefault는 <a href>, <submit>으로 잘못된 접근을 방지함.
        console.log(this.titleInputElement.value);
    }

    //15/
    private configure() {
        // 2?
        // this.element 잡기 이건 <form>이며 이벤트 리스너를 추가하기.
        // 이걸 메서드에 바인딩하기
        // attach 실행전에 configure 메소드 실행.

        this.element.addEventListener('submit', this.submitHandler.bind(this));
        // addEventListener('submit', this.submitHandler) 여기서
        // cannot read properties,,value 왜?
        // .this 키워드가 문제, this.submitHandler가 클래스를 지시하고 있다.
        // 자바스립과 타입스립이 작동하는 방식떄문
        // this.submitHandler 이 메소드를 이벤트 리스너에 바인딩하고,

        // 우리가 뭔가 이벤트에 바인딩하거ㅏㄴ addEvenListenr()의 도움을 받을 떄,
        // 즉 실행될 메서드에서 이 this는 다른 뭐가에 바인딩되기 때문
        // 이 경우엔 이벤트의 현재 타깃에 바인딩되죠. 
        // this.submitHandler 메서드가 동작할때 bind()를 써서
        // 나중에 이 함수가 실행될 떄 어떻게 실행될지 미리 설정하는 방법이다. 
        // 첫번째 인수는 이 this 키워드가 참조할 대상입니다. 
        
        // submitHandler() 안의 this는 컨택스트(class instance) 안에서 this가 참조할 것과 같은 걸 참조하겠다는 것.
        // ???
        // 그리고 configure()의 컨택스트 안에서 그걸 호출하기 떄메,
        // this.configure()라고 하기 떄문에 
        // configure() 안의 this는 클래스를 참조하고,
        // bind() 덕분에 submintHandler 클래스를 참조하는 것이다. 

        // addEventListener 는 'submit'이라는 이벤트를 받으면, 두번째 인수가 메서드라면 그게 실행ㄷ됨.
        // bind : this가 bind의 값으로 설정된 새오로운 함수를 던진다. 


        // 과제 데코레이터를 이용해서 이 바인딩 문제를 해결하기 

    }
    
    // 선택 로직과 렌더링 로직을 분할하기, 그럴필욘 없음.
    // this.hostElement으로 콘텐츠 렌더링하기
    // 그리고 insertAdjacentElement를 호출하기 : HTML 요소를 삽입할 대 쓰인다.
    // hostElement의 시작 태그 바로 뒤에 삽입할 수 있다.
    // 무얼 삽입할거야? 1. 생성자 안의 상수들(docum..) 2. DocumentFragment (importNode)
    //09/
    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element) //11/
        //insertAdjacentElement 특정 위치에 노드 추가하기 
    }
}

//17/
const prjInput = new ProjectInput();