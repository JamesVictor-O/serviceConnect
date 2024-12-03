const userForm = document.getElementById('userForm');
userForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const firstNameInput = document.getElementById("firstName").value;
  const lastNameInput = document.getElementById('lastName').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const errorMessage = document.getElementById('errorMessage');

     firstNameInput.addEventListener("input", function(e){
      if (firstNameInput.length < 3){
        alert('i am clicked')

      }
      // e.preventDefault();

     })

});

