// 비동기 요청 처리를 위한 XMLHttpRequest 객체 선언.
let httpRequest1, httpRequest2;

window.onload = function () {
  /***************** 비동기 요청 start *****************/
  // 프로그래밍 언어 목록 요청.
  httpRequest1 = sendRequest("data/programming.xml", null, programmingBook, "GET");

  // 에세이 목록 요청.
  httpRequest2 = sendRequest("data/essay.json", null, essayBook, "GET");
  /***************** 비동기 요청 end *****************/

  /***************** 투표 생성 start *****************/
  // localStorage에서 poll이름의 data 얻기.
  let poll = localStorage.getItem("poll");
  // 투표가 보여질 div
  let pollDiv = document.querySelector("#vote");
  if (poll) {
    // localStorage에서 얻은 문자열을 JSON객체로 변환.
    var vote = JSON.parse(poll);
    var sdate = vote.start_date; // 시작일.
    var edate = vote.end_date; // 종료일.
    var question = vote.question; // 질문.
    var answers = vote.answers; // 답변항목.
    // 투표 화면 구성.
    let pollContent = `<div class="text-center text-secondary mb-3"><h4>[ 당신의 선택 ]</h4></div>
    <div class="font-weight-bold"> ${question} </div>
    <div class="p-3"> <ul class="nav flex-column">`;

    answers.forEach((answer) => {
      pollContentv += `
      <li class="nav-item">
      <li>
        <label><input type="radio" name="vote_answer" value="${answer}" /> ${answer}
        </label>
      </li >
      </ul>
      </div>
      <div class="text-center">
      <button class="btn btn-outline-primary btn-sm" onclick="javascript:poll();">투표하기</button>
      <button class="btn btn-outline-danger btn-sm">결과보기</button>
      </div>
      <div class="text-right text-secondary mt-1">투표기간 :
      ${dateFormat(sdate)} ~ ${dateFormat(edate)}
      </div>
      pollDiv.innerHTML = pollContent;
      `;
    });
  } else {
    // 진행중인 투표가 없을 경우 화면 추가.
    pollDiv.innerHTML = '<div class="vote_title">진행중인 투표가 없습니다.</div>';
  }
  /***************** 투표 생성 end *****************/
};

function programmingBook() {
  // 서버로부터 data를 전부 받은 상태 (Completed)
  if (httpRequest1.readyState == 4) {
    // 서버로부터의 응답 상태 (OK)
    if (httpRequest1.status == 200) {
      // 서버에서 응답 온 data를 XML로 받음.
      let books = httpRequest1.responseXML;
      // xml에서 책목록을 배열로 받음.
      let booklist = books.querySelectorAll("book");
      let len = booklist.length;
      let bookView = "";
      booklist.forEach((book) => {
        let isbn = book.querySelector("isbn").childNodes[0].nodeValue; // xml에서 isbn 얻기
        let title = book.querySelector("title").childNodes[0].nodeValue; // xml에서 제목 얻기
        let price = book.querySelector("price").childNodes[0].nodeValue; // xml에서 가격 얻기
        let desc = book.querySelector("description").childNodes[0].nodeValue; // xml에서 설명 얻rl
        bookView += `<div class="col-md-3 border border-secondary rounded pt-2 pb-2">
          <div class="mt-1">
          <img src="img/book/'${isbn}.png" class="rounded w-100" title="${desc}" alt="" />
          </div>
          <div class="mt-1 p-1 text-center" style="background-color: #f2f2f2;">
          <h6>${title}<br />${numberWithCommas(price)}원</h6>
          </div>
          </div>
          `;
      });
      // 책의 갯수만큼 화면구성
      // 아이디가 plist인 div에 책화면을 html로 삽입.
      document.querySelector("#plist").innerHTML = bookView;
    }
  }
}

function essayBook() {
  // 서버로부터 data를 전부 받은 상태 (Completed)
  if (httpRequest2.readyState == 4) {
    // 서버로부터의 응답 상태 (OK)
    if (httpRequest2.status == 200) {
      // 서버에서 응답 온 data를 text로 받음.
      let books = httpRequest2.responseText;
      // 위의 text를 JSON객체로 변환.
      let booklist = JSON.parse(books);
      let len = booklist.length;
      let bookView = "";
      booklist.forEach((book) => {
        bookView += `
        <div class="col-md-3 border border-secondary rounded pt-2 pb-2">
        <div class="mt-1">
        <img src="img/book/${book.isbn}.png" class="rounded w-100" title="${book.description}" />
        </div>
        <div class="mt-1 p-1 text-center" style="background-color: #f2f2f2;">
        <h6>${book.title} <br />${numberWithCommas(book.price)}원</h6>
        </div>
        </div>
        `;
      });
      // 아이디가 elist인 div에 책화면을 html로 삽입.
      document.querySelector("#elist").innerHTML = bookView;
    }
  }
}

// 정규표현식을 이용한 3자리마다 ,(comma) 찍기(가격)
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 투표 시작일과 종료일 날짜 형식. (yy.mm.dd)
const dateFormat = (date) => {
  let yymmdd = date.split("-");
  return yymmdd[0].substr(2, 2) + "." + yymmdd[1] + "." + yymmdd[2];
};

// 로그인
const login = () => {
  // 사용자 정보를 입력받는다.
  let userid = prompt("아이디입력", "ssafy");
  if (userid.length == 0) {
    alert("아이디 입력!!!");
    return;
  }
  let userpass = prompt("비밀번호입력", "1234");
  if (userpass.length == 0) {
    alert("비밀번호 입력!!!");
    return;
  }
  if (userid == "ssafy" && userpass == "1234") {
    alert("로그인 성공!!!");
    // id가 profile_img인 element의 src 속성의 값을 img/profile.png로 설정.
    document.querySelector("#profile_img").src = "img/profile.png";
    document.querySelector("#header_nav_confirm_off").style.display = "none";
    document.querySelector("#header_nav_confirm_on").style.display = "";
  } else {
    alert("아이디 또는 비밀번호 확인!!!");
  }
};

// 로그아웃
const logout = () => {
  // id가 profile_img인 element의 src 속성의 값을 img/noimg.png로 설정.
  document.querySelector("#profile_img").setAttribute("src", "img/noimg.png");
  document.querySelector("#header_nav_confirm_on").setAttribute("style", "display: none");
  document.querySelector("#header_nav_confirm_off").setAttribute("style", "display: ");
};

//투표하기
const poll = () => {
  let votes = document.querySelectorAll('input[name="vote_answer"]');
  let sel_menu = "";
  votes.forEach((vote) => {
    vote.checked ? (sel_menu = vote.value) : "";
  });
  alert(sel_menu + "를 선택했습니다.");
};

// 투표만들기
const pollMake = () => {
  // pollmake.html의 창아이디를 poll로 설정하고 가로 500, 세로 300인 창을 열기.
  window.open("pollmake.html", "poll", "width=500,height=300,top=300,left=400");
};

// 답변 항목 추가
const addAnswer = () => {
  let listDiv = document.querySelector("#poll_answer_list");

  let divEl = document.createElement("div"); // <div></div>
  divEl.setAttribute("class", "poll_answer_item form-inline mb-1"); // <div class="poll_answer_item"></div>
  let inputEl = document.createElement("input"); // <input/>
  inputEl.setAttribute("type", "text"); // <input type="text"/>
  inputEl.setAttribute("class", "form-control col-lg-10 mr-3"); // <input type="text" class="form-control"/>
  inputEl.setAttribute("name", "answer"); // <input type="text" class="form-control" name="answer"/>
  let buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "button");
  buttonEl.setAttribute("class", "btn btn-outline-danger btn-sm");
  // 버튼에 click 이벤트 리스너 등록.
  buttonEl.addEventListener("click", function (e) {
    let parent = this.parentNode;
    listDiv.removeChild(parent);
  });
  buttonEl.appendChild(document.createTextNode("삭제"));

  divEl.appendChild(inputEl);
  divEl.appendChild(buttonEl);
  listDiv.appendChild(divEl);
};

// 투표 생성
const makePoll = () => {
  let sdate = document.querySelector("#start_date").value; // 시작일.
  let edate = document.querySelector("#end_date").value; // 종료일.
  if (!sdate || !edate) {
    // 시작, 종료일 유효성검사.
    alert("설문 기간 입력!!!");
    return;
  }

  let quest = document.querySelector("#question").value; // 질문.
  if (!quest) {
    // 질문 유효성검사.
    alert("질문 내용 입력!!!");
    return;
  }

  let answerInput = document.querySelectorAll('input[name="answer"]'); // 답변 항목.
  answerInput.forEach((input) => {
    !input.value ? alert("답변 항목 입력!!!") : "";
  });

  let answers = [];
  answerInput.forEach((input) => {
    answers.push(input.value);
  });
  for (let i = 0; i < answerInput.length; i++) {
    answers.push(answerInput[i].value); // 답변 배열에 입력 data 넣기.
  }

  // 입력 data를 이용하여 JSON객체 생성.
  let poll = {
    start_date: sdate,
    end_date: edate,
    question: quest,
    answers: answers,
  };

  let poll_json = JSON.stringify(poll); // JSON객체를 문자열 변환.

  localStorage.setItem("poll", poll_json); // localStorage에 넣기.

  alert("투표를 생성합니다.");

  document.location.reload(); // 부모창 새로고침.
  $("#voteModal").modal("hide"); // 모달창 닫기.
};
