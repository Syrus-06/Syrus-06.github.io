---
layout: home
---

<section class="categories">
  <a href="/apparel" class="category-tile">
    <img src="/assets/images/apparel.jpg" alt="Apparel">
    <span>Apparel</span>
  </a>
  <a href="/footwear" class="category-tile">
    <img src="/assets/images/footwear.jpg" alt="Footwear">
    <span>Footwear</span>
  </a>
  <a href="/gym-essentials" class="category-tile">
    <img src="/assets/images/gym-essentials.jpg" alt="Gym Essentials">
    <span>Gym Essentials</span>
  </a>
  <a href="/supplements" class="category-tile">
    <img src="/assets/images/supplements.jpg" alt="Supplements">
    <span>Supplements</span>
  </a>
</section>

<section class="journal">
  <span class="section-label">THE JOURNAL</span>
  <h2>LATEST FROM WINTER ARC</h2>
  <div class="journal-list">
    {% for post in site.posts limit:5 %}
    <a href="{{ post.url }}" class="journal-item">
      <span class="journal-date">{{ post.date | date: "%b %d, %Y" }}</span>
      <span class="journal-category">{{ post.category | default: "TRAINING" }}</span>
      <span class="journal-title">{{ post.title }}</span>
      <span class="journal-arrow">→</span>
    </a>
    {% endfor %}
  </div>
</section>
