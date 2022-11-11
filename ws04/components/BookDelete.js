export default {
  template: `
  <div>
      <h1>SSAFY 도서 삭제</h1>
      <div>삭제중...</div>
    </div>
  `,
  created() {
    // url 파라미터에서 isbn 정보 얻기
    const params = new URL(document.location).searchParams;
    // 로컬스토리에서 읽어오기
    const booklist = JSON.parse(localStorage.getItem("booklist"));
    // 책 목록 중에 isbn 같은 책을 제거 후 저장
    booklist.books = booklist.books.filter(book => book.isbn != params.get("isbn"))
    localStorage.setItem("booklist", JSON.stringify(booklist));
    alert("삭제가 완료되었습니다.");
    
    // list.html 로 이동
    location.href = "./list.html";
  },
}