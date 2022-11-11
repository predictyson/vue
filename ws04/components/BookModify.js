export default {
  template: `
    <div class="regist">
      <h1 class="underline">SSAFY 도서 수정</h1>
      <div class="regist_form">
        <label for="isbn">도서번호</label>
        <input type="text" id="isbn" name="isbn" v-model="isbn" ref="isbn"> <br/>
        <label for="title">도서명</label>
        <input type="text" id="title" name="title" v-model="title" ref="title"> <br/>
        <label for="author">저자</label>
        <input type="text" id="author" name="author" v-model="author" ref="author"> <br/>
        <label for="price">가격</label>
        <input type="number" id="price" name="price" v-model="price" ref="price"> <br/>
        <label for="content">설명</label>
        <textarea id="content" name="content" v-model="content" cols="30" rows="10" ref="content"></textarea><br/>
        <button @click="checkValue">수정</button>
        <button @click="moveList">목록</button>
      </div>
    </div>
  `,
  data() {
    return {
      isbn:"",
      title:"",
      author:"",
      price:"",
      content:"",
    }
  },
  created() {
    // url 파라이터에서 정보 얻기
    const params = new URL(document.location).searchParams;
    // 로컬스토리지에서 booklist 목록 얻기
    const booklist = JSON.parse(localStorage.getItem("booklist"));
    
    for (const obj of booklist.books) {
      if (params.get("isbn") == obj.isbn) {
        this.isbn = obj.isbn;
        this.title = obj.title;
        this.author = obj.author;
        this.price = obj.price;
        this.content = obj.content;
        break;
      }
    }
  },
  methods: {
    // 입력값 체크하기, 입력이 정상적으로 됐으면 => 등록
    checkValue() {
      // 사용자 입력값 체크하기
      let err=true;
      let msg="";
      !this.isbn && ((msg="isbn을 입력해주세요"), (err=false), this.$refs.isbn.focus());
      err && !this.title && ((msg="title을 입력해주세요"), (err=false), this.$refs.title.focus());
      err && !this.author && ((msg="author을 입력해주세요"), (err=false), this.$refs.author.focus());
      err && !this.price && ((msg="price을 입력해주세요"), (err=false), this.$refs.price.focus());
      err && !this.content && ((msg="content을 입력해주세요"), (err=false), this.$refs.content.focus());

      if (!err) { // 에러발생
        alert(msg);
      } else { // 모두 입력 완료
        this.modifyBook();
      }
    },
    // 책 수정
    modifyBook() {
      // url 파라이터에서 정보 얻기
      const params = new URL(document.location).searchParams;
      // 로컬스토리지에 저장된 데이터를 가져오기
      const booklist = JSON.parse(localStorage.getItem("booklist"));
      for (let i = 0; i < booklist.books.length; i++) {
        if (booklist.books[i].isbn == params.get("isbn")) {
          booklist.books[i] = {
            isbn : this.isbn,
            title: this.title,
            author: this.author,
            price: this.price,
            content: this.content,
          }
        }
        break;
      }

      // 로컬스토리지에 저장
      localStorage.setItem("booklist", JSON.stringify(booklist));
      alert("수정이 완료되었습니다.");
      // list.html 로 이동
      this.moveList();
    },
    moveList() {
      location.href ="./list.html";
    }
  },
}