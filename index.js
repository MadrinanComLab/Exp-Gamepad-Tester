console.log("POTAENA");

let controller_index = null;

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    controller_index = gamepad.index;

    console.log(`Your "${gamepad.id}" is now connected!`);
});

window.addEventListener("gamepadcdisonnected", (event) => {
    controller_index = null;

    console.log("Your controller device has disconnected.");
});

handleButtons = (buttons) => {
    for(let button_index = 0; button_index < buttons.length; button_index++){
        const button = buttons[button_index];
        const button_element = document.getElementById(`controller-b${button_index}`);
        const selected_button_class = "selected-button";

        if(button_element){
            if(button.value > 0){
                button_element.classList.add(selected_button_class);
                button_element.style.filter = `contrast(${button.value * 150}%)`;
            }
            else{
                button_element.classList.remove(selected_button_class);
                button_element.style.filter = `contrast(100%)`;
            }
        }
    }
}

gameLoop = () => {
    if(controller_index !== null){
        const gamepad = navigator.getGamepads()[controller_index];
        handleButtons(gamepad.buttons);
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();