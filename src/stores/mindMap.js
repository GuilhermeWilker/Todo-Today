import { defineStore } from "pinia";

export default defineStore("mindMap", {
  actions: {
    createMindMap(e) {
      // Coordenadas X e Y do mouse
      const x = e.clientX - 130;
      const y = e.clientY - 67;

      // Criando novo elemento div, configurando posição - estilo - input de texto
      const newDiv = document.createElement("div");
      newDiv.style.cssText = `
         position: absolute;
         left: ${x}px;
         top: ${y}px;
         width: 250px;
         height: 110px;
         background-color: white;
         box-shadow: 10px 10px 0px #000000;
         border: 1px solid #000000;
       `;

      const newInput = document.createElement("textarea");
      newInput.style.cssText = `
         width: 100%;
         height: 100%;
         padding: 30px 5px 5px 5px;
         border:none;
         outline: none;
         font-family: sans-serif;
         font-size: 18px;
         text-align: center;
         resize: none;
         overflow-y: hidden;
         cursor: pointer;
       `;

      // Renderizando os elementos no board
      newDiv.appendChild(newInput);
      document.body.appendChild(newDiv);
      newInput.focus();

      // Remover o bloco com atalho [CTRL + Click]
      newDiv.addEventListener("click", (event) => {
        if (event.ctrlKey) {
          document.body.removeChild(newDiv);
        }
      });

      // Eventos de arrastar os blocos
      let currentX, currentY, initialX, initialY;
      let isDragging = false;

      let xOffset = 0;
      let yOffset = 0;

      newDiv.addEventListener("mousedown", dragStart);
      newDiv.addEventListener("mouseup", dragEnd);
      newDiv.addEventListener("mousemove", drag);

      function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === newInput) {
          isDragging = true;
        }
      }

      function dragEnd() {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
      }

      function drag(event) {
        if (isDragging) {
          event.preventDefault();

          currentX = event.clientX - initialX;
          currentY = event.clientY - initialY;

          xOffset = currentX;
          yOffset = currentY;

          setTranslate(currentX, currentY, newDiv);
        }
      }

      function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
      }
    },
  },
});
