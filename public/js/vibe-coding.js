const imagePreview = document.querySelector("[data-image-preview]");
const imageDialog = document.querySelector(".vibe-lightbox");

// 没有 dialog 支持时保留原图链接；原生对话框支持 Esc 和键盘焦点管理。
if (imagePreview && imageDialog && typeof imageDialog.showModal === "function") {
  imagePreview.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    imageDialog.showModal();
    document.documentElement.classList.add("vibe-preview-open");
  });

  imageDialog.querySelector(".vibe-lightbox-close").addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", (event) => {
    if (event.target !== imageDialog) return;
    const bounds = imageDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      imageDialog.close();
    }
  });
  imageDialog.addEventListener("close", () => {
    document.documentElement.classList.remove("vibe-preview-open");
  });
}
