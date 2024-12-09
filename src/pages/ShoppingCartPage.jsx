import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CartItemComponent from "@/components/CartItemComponent";
import PaymentComponent from "@/components/PaymentComponent";
import Layout from "./Layout";

const cartItems = [
];

function ShoppingCartPage() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Botón de volver */}
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </a>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">
              Your Shopping Cart is Empty
            </h1>
            <p className="mb-8 text-gray-600">
              Looks like you havent added any items to your cart yet.
            </p>
            <a
              href="/"
              className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Items del carrito */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  Shopping cart
                  <span className="ml-2 text-gray-500">
                    You have {cartItems.length} items in your cart
                  </span>
                </h1>

                <Select defaultValue="price">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Sort by: price</SelectItem>
                    <SelectItem value="name">Sort by: name</SelectItem>
                    <SelectItem value="quantity">Sort by: quantity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border bg-white p-6">
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    product={item}
                    quantity={item.quantity}
                    onRemove={(id) => console.log("Remove item:", id)}
                  />
                ))}
              </div>
            </div>

            {/* Detalles de pago */}
            <div>
              <PaymentComponent subtotal={subtotal} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ShoppingCartPage;
