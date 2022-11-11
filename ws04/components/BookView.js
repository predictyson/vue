export default {
  template: `
  <div class="view">
    <h1 class="underline">SSAFY 도서 정보</h1>
    <div class="regist_form">
      <label for="isbn">도서번호</label>
      <div class="view" id="isbn">{{book.isbn}}</div>
      <label for="title">도서명</label>
      <div class="view" id="title">{{book.title}}</div>
      <label for="author">저자</label>
      <div class="view" id="author">{{book.author}}</div>
      <label for="price">가격</label>
      <div class="view" id="price">{{numberWithCommas(book.price)}}원</div>
      <label for="content">설명</label>
      <div class="view" id="content" v-html="enterToBr(book.content)"></div>
      <div style="padding-top: 15px;">
        <a :href="'./modify.html?isbn='+book.isbn" class="btn">수정</a>
        <a :href="'./delete.html?isbn='+book.isbn" class="btn">삭제</a>
        <a href="./list.html" class="btn">목록</a>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      book : {},
    }
  },
  created() {
    // url 에서 파라미터 정보를 얻기
    const params = new URL(document.location).searchParams; 

    // localstorage에서 booklist 저장된 도서정보 얻어오기
    const booklist = localStorage.getItem("booklist");
    let newBook = {
      books :[],
    };
    if (booklist) {
      newBook = JSON.parse(booklist);
    }

    // 파라미터에서 얻은 isbn 과 동일한 책을 찾는다.
    for (let obj of newBook.books) {
      if (params.get("isbn") == obj.isbn) {
        this.book = obj; // book 변수에 저장
        break;
      }
    }
  },
  methods: {
    numberWithCommas(x) {
      // 숫자 3자리 마다 , 찍기
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    enterToBr(str) { // 문자열에 포함된 줄바꿈 문자를 <br/>로 변경
      return str.replace(/(\n|\r\n)/g, '<br/>');
    }
  },
}