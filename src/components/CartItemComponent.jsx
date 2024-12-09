import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function CartItemComponent({ product, quantity, onRemove }) {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">
            {product.storage}, {product.color}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <span className="w-8 text-center">{quantity}</span>
        <span className="w-24 text-right font-semibold">${product.price}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(product.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default CartItemComponent;
