export default {
  template: `
  <div class="regist">
    <h1 class="underline">SSAFY 도서 등록</h1>
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
      <button @click="checkValue">등록</button>
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
        this.registBook();
      }
    },
    // 책 등록
    registBook() {
      // 로컬스토리지에 저장된 데이터를 가져오기
      const booklist =  localStorage.getItem("booklist");
      let newBook = {
        books:[]
      };
      if (booklist) {
        newBook = JSON.parse(booklist);
      }

      // 입력한 데이터를 newBook에 추가
      newBook.books.push({
        isbn : this.isbn,
        title: this.title,
        author: this.author,
        price: this.price,
        content: this.content,
      });

      // 로컬스토리지에 저장
      localStorage.setItem("booklist", JSON.stringify(newBook));
      alert("등록이 완료되었습니다.");
      // list.html 로 이동
      this.moveList();
    },
    moveList() {
      location.href = "./list.html";
    },
  },
};