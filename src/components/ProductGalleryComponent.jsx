function ProductGalleryComponent(props) {

  return (
    <div className="w-full">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={props.image}
          alt="Product main view"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default ProductGalleryComponent;
