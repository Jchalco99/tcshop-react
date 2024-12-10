import { Heart, Eye, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function CardComponent(props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-white">
      <div className="relative aspect-square">
        
        {/* Product Image */}
        <img
          src={props.image}
          alt={props.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90">
            <Heart className="h-4 w-4" />
          </Button>
          <Link to={`/producto/${props.idProducto}`}>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="text-sm uppercase text-gray-400">{props.category}</div>
        <h3 className="mt-2 flex-1 text-lg font-semibold">{props.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-[#1f293a]">${props.price}</span>
        </div>
      </div>

      {/* Add to Cart Button - Appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform group-hover:translate-y-0">
        <Button className="w-full rounded-none bg-[#1f293a] hover:bg-[#0ef]">
          <ShoppingCart className="mr-2 h-4 w-4" />
          ADD TO CART
        </Button>
      </div>
    </div>
  )
}

export default CardComponent
