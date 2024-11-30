const scriptURL = process.env.SCRIPT_URL || '';

function verifyPhone() {
const phone = document.getElementById('phone').value;

fetch(`${scriptURL}?phone=${phone}`)
.then(response => response.json())
.then(data => {
  console.log('User data:', data);
  if (data.exists) {
    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-place').textContent = data.place;
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('visitor-form').style.display = 'none';
    document.getElementById('category-selection').style.display = 'block';
  } else {
    document.getElementById('name-entry').style.display = 'block';
    document.getElementById('visitor-form').style.display = 'none';
  }
})
.catch(error => console.error('Error fetching user data:', error));
}

function saveName() {
  const phone = document.getElementById('phone').value;
  const name = document.getElementById('name').value;
  const place = document.getElementById('place').value;

  // Save the new user's name and place in the database
  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({
      phone: phone,
      name: name,
      place: place
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Name and place saved!');
        document.getElementById('name-entry').style.display = 'none';
        document.getElementById('category-selection').style.display = 'block';
      } else {
        alert('Error saving name and place. Please try again.');
      }
    })
    .catch(error => console.error('Error saving name and place:', error));
}

function showSubitems() {
  const category = document.getElementById('category').value;
  if (category === 'Case') {
    document.getElementById('subitems').style.display = 'block';
  } else {
    document.getElementById('subitems').style.display = 'none';
  }
}

function saveCategory() {
  const category = document.getElementById('category').value;
  const subitem = document.getElementById('subitem').value;

  // Add logic to save category or additional data here
  alert(`Category: ${category}${category === 'Case' ? `, Subitem: ${subitem}` : ''} saved!`);
}