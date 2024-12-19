<template>
  <section class="col-md-3">
    <h3>Categories</h3>
    <ul class="list-group">
      <li class="list-group-item"><a href="#">All Article</a></li>
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
  margin-right: -50px;
  padding-left: 100px;
  border-left: 1px solid #D7C8A1;
}
</style>
