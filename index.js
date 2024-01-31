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

handleSticks = (axes) => {
    /* This will detect the movement in left stick and the axes[0] is for the left and right. while axes[1] is for detecting up and down. */
    updateStick("controller-b10", axes[0], axes[1]);
    
    /* This will detect the movement in right stick and the axes[2] is for the left and right. while axes[3] is for detecting up and down. */
    updateStick("controller-b11", axes[2], axes[3]);
}

updateStick = (element_id, left_right_axis, up_down_axis) => {
    const multiplier = 25;
    const stick_left_right = left_right_axis * multiplier;
    const stick_up_down = up_down_axis * multiplier;

    const stick = document.getElementById(element_id);
    const x = Number(stick.dataset.originalXPosition);
    const y = Number(stick.dataset.originalYPosition);

    stick.setAttribute("cx", x + stick_left_right);
    stick.setAttribute("cy", y + stick_up_down);
}

gameLoop = () => {
    if(controller_index !== null){
        const gamepad = navigator.getGamepads()[controller_index];
        handleButtons(gamepad.buttons);
        handleSticks(gamepad.axes);
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();