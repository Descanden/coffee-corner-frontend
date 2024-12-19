<template>
  <section class="sidebar">
    <h3>Categories</h3>
    <ul class="list-group">
      <li class="list-group-item">
        <a href="#">All Article</a>
      </li>
      <li class="list-group-item">
        <div class="accordion" id="catalogueAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingCatalogue">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCatalogue" aria-expanded="false" aria-controls="collapseCatalogue">
                Catalogue
              </button>
            </h2>
            <div id="collapseCatalogue" class="accordion-collapse collapse" aria-labelledby="headingCatalogue">
              <div class="accordion-body">
                <ul class="list-unstyled">
                  <li><a href="#">Filter</a></li>
                  <li><a href="#">Accessories</a></li>
                  <li><a href="#">Equipment</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Sidebar"
};
</script>

<style scoped>
.sidebar {
  width: 25%;
  margin-right: -20px;
  padding-left: 15px;
  border-left: 1px solid #D7C8A1;
  background-color: white; /* Light brown background */
  color: #5A3E2B; /* Dark brown text color */
}

h3 {
  color: #8B5E3C; /* Slightly lighter brown */
}

.list-group-item {
  background-color: #FAF3E7; /* Very light beige for items */
  color: #5A3E2B;
}

.list-group-item a {
  text-decoration: none;
  color: #8B5E3C;
  font-weight: bold;
}

.list-group-item a:hover {
  color: #5A3E2B; /* Darker brown on hover */
}

.accordion-button {
  background-color: #FAF3E7; /* Light beige for button */
  color: #5A3E2B;
  border: none;
}

.accordion-button:focus {
  box-shadow: none;
}

.accordion-item {
  border: none;
}

.accordion-body {
  background-color: #F9F5ED; /* Very light brown for body */
  color: #5A3E2B;
}
</style>
