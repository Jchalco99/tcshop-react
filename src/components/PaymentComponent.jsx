import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

function PaymentComponent({ subtotal, shipping = 20 }) {
  const [selectedPayment, setSelectedPayment] = useState("mastercard");
  const total = subtotal + shipping;

  const paymentMethods = [
    { id: "mastercard", icon: faCreditCard, label: "Mastercard" },
    { id: "visa", icon: faCreditCard, label: "Visa" },
    { id: "amex", icon: faCreditCard, label: "Amex" },
    { id: "paypal", icon: faPaypal, label: "PayPal" },
    { id: "cash", icon: faMoneyBill, label: "Efectivo" },
  ];

  return (
    <div className="rounded-2xl bg-blue-600 p-6 text-white">
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">Detalles de pago</h2>

        {/* Card Types */}
        <div className="mb-4">
          <Label className="text-sm">Tipo de pago</Label>
          <div className="mt-2 flex gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                className={`rounded border border-white/20 p-2 transition-colors ${
                  selectedPayment === method.id
                    ? "bg-white text-blue-600"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <FontAwesomeIcon icon={method.icon} className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>

        {selectedPayment !== "cash" ? (
          /* Card Form */
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre en la tarjeta</Label>
              <Input
                id="name"
                placeholder="Nombre"
                className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <Label htmlFor="number">Número de tarjeta</Label>
              <Input
                id="number"
                placeholder="0000 0000 0000 0000"
                className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  placeholder="12/24"
                  className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="342"
                  className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Cash payment message */
          <div className="mt-4 rounded-lg bg-white/10 p-4 text-center">
            <p>
              Por favor, pase por nuestra tienda para realizar el pago en
              efectivo.
            </p>
            <p className="mt-2 font-bold">
              Dirección: Calle Principal #123, Ciudad
            </p>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="space-y-2 border-t border-white/20 pt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total (Incl. impuestos)</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button className="mt-6 w-full bg-blue-500 text-lg hover:bg-blue-400">
        ${total.toFixed(2)}
        <span className="ml-auto flex items-center gap-2">
          Pagar
          <ArrowRight className="h-5 w-5" />
        </span>
      </Button>
    </div>
  );
}

export default PaymentComponent;
