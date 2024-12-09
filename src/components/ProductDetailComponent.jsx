import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ProductDetailComponent(props) {
    const [quantity, setQuantity] = useState(1)
  
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#1f293a]">{props.name}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex text-[#1f293a]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < props.rating ? 'text-[#0ef]' : 'text-gray-200'}>
                ★
              </span>
            ))}
          </div>
          <a href="#reviews" className="text-sm text-gray-500">
            {props.reviewCount} Review(s) | Añade la tuya
          </a>
        </div>
  
        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-[#1f293a]">${props.price}</span>
          <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">DISPONIBLE</span>
        </div>
  
        {/* Description */}
        <p className="text-gray-600">{props.description}</p>
  
        {/* Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="rounded-none text-center"
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button className="bg-[#1f293a] hover:bg-[#0ef]">AÑADIR AL CARRITO</Button>
        </div>
  
        {/* Wishlist and Compare */}
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Heart className="h-4 w-4" />
            LISTA DE DESEOS
          </Button>
        </div>
  
        {/* Categories and Share */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex gap-2">
            <span className="font-semibold">CATEGORIA:</span>
            <a href="#" className="text-blue-600">{props.category}</a>
          </div>
        </div>
      </div>
    )
  }

export default ProductDetailComponent;
