/* Dynamic typewriter animation, better than using the CSS method and works for all texts */

/*
// Sleep function using Promise
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Main typing function
async function typing(){
    // Store current text as a constant first
    const elements = document.getElementsByClassName('typing');

    for(let x = 0; x < elements.length; x++){
        // Get selected element
        const currText = elements[x].innerHTML;

        // Clear text
        document.getElementsByClassName('typing')[x].innerHTML = '';

        // Use a loop to loop through all the characters in the current text
        for(let y = 0; y < currText.length; y++){
            // Add the next character
            document.getElementsByClassName('typing')[x].innerHTML += currText[y];

            // Set a delay for 0.25 second and offset timings for all elements
            await sleep(125);
        }
    }
}

// Execute function
typing();
*/

// Function for typing effect
function startTyping(element){
    // Store text before clearing
    const currText = element.innerHTML;
    // Empty string
    element.innerHTML = "";
    // Record current iteration
    let iterations = 0;

    // Declare a new function
    function typing(){
        // If conditions are met, exit function
        if(iterations >= currText.length) return;

        // Add the next character
        element.innerHTML += currText[iterations];

        // Iterate
        iterations++;

        // Call the function again after 62.5ms
        setTimeout(typing, 62.5);
    }

    // Call function after a set delay
    setTimeout(typing, 500);
}

// Create intersection observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // Simply return when intersection has not been made
        if(!entry.isIntersecting) return;
        // Call on function
        startTyping(entry.target);
        // Stop observing once started
        observer.unobserve(entry.target);
    });
}, { threshold: 0.5 });

// Observe all elements with the 'typing' class
document.querySelectorAll('.typing').forEach(element => {
    observer.observe(element);
});