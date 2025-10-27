document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach(box => {
    const editIcon = box.querySelector(".edit-icon");
    const portNumber = box.querySelector(".port-number");

    editIcon.addEventListener("click", () => {
      if (box.querySelector("input")) return;

      const currentValue = portNumber.textContent.trim();

      const editInput = document.createElement("input");
      editInput.type = "number";
      editInput.value = currentValue;
      editInput.classList.add("edit-input");

      const saveButton = document.createElement("button");
      saveButton.textContent = "ثبت";
      saveButton.classList.add("save-button");

      portNumber.style.display = "none";

      box.appendChild(editInput);
      box.appendChild(saveButton);

      saveButton.addEventListener("click", () => {
        const newValue = editInput.value.trim();
        if (newValue !== "") {
          portNumber.textContent = newValue;
        }

        editInput.remove();
        saveButton.remove();

        portNumber.style.display = "";
      });
    });
  });
});
