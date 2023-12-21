<?php 
    $price = get_field('price', $post_id);
    $bedrooms = get_field('bedrooms', $post_id);
    $bathrooms = get_field('bathrooms', $post_id);

?>
<div class="property-details">
    <div class="price"><?php echo $price; ?>€</div>
    <div class="beds-baths">
        <div class="beds"><?php echo $bedrooms; ?> bedrooms</div>
        <div class="baths"><?php echo $bathrooms; ?> bathrooms</div>
    </div>
</div>