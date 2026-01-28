import { db, auth } from "./firebase.js";
import { initAuth } from "./auth.js";


initAuth();

// 글 작성 (Post creation)
const submit = document.getElementById("submit");
if (submit) {
  submit.onclick = async () => {
    if (!auth.currentUser) return alert("로그인 필요");

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: serverTimestamp(),
        authorUid: auth.currentUser.uid, // Store author's UID
        authorNickname: auth.currentUser.displayName || (await getDocs(collection(db, "users"))).docs.find(doc => doc.id === auth.currentUser.uid)?.data()?.nickname || "Anonymous", // Try to get nickname
      });

      alert("작성 완료");
      location.href = "/"; // Redirect to homepage after post
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };
}

// 글 목록 (Post listing)
const list = document.getElementById("postList");
if (list) {
  const fetchPosts = async () => {
    try {
      const snap = await getDocs(collection(db, "posts"));
      list.innerHTML = ""; // Clear existing posts
      snap.forEach(doc => {
        const d = doc.data();
        const el = document.createElement("div");
        el.innerHTML = `
          <h4>${d.title}</h4>
          <p>${d.content}</p>
          <small>Posted by: ${d.authorNickname || "Anonymous"}</small>
          ${d.createdAt ? `<small> at ${new Date(d.createdAt.toDate()).toLocaleString()}</small>` : ''}
        `;
        list.appendChild(el);
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
      list.innerHTML = `<p>게시물을 불러오는 중 오류가 발생했습니다.</p>`;
    }
  };
  fetchPosts();
}