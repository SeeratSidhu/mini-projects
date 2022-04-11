const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });

})

containers.forEach(container => {
  container.addEventListener("dragover", (e) => {

    e.preventDefault();
    const afterElement = getAfterElement(container, e.clientY);
    
    //get the element we are currently dragging
    const draggable = document.querySelector(".dragging");

    if (!afterElement) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  })
})

//get the element that we are currently hovering over; the container and its children, the y coord of mouse

function getAfterElement(container, y) {

  //elements inside our container, not the one currently being dragged
  const elements = [...container.querySelectorAll(".draggable:not(.dragging)")];

  //determine which single element is directly after our mouse cursor based on the y position we pass in
  return elements.reduce((closest, child) => {

    const box = child.getBoundingClientRect();

    //offset is the position of our mouuse down to our box top down to the middle of box
    const offset = y - box.top - box.height / 2;

    //negative offset means we are hovering above our intended element and we also want to choose the element 
    //thats as close to zero as possible
    if(offset < 0 && offset > closest.offset) {
      return {offset: offset, element: child}
    } else {
      return closest;
    }

  }, {offset: Number.NEGATIVE_INFINITY}).element

}

