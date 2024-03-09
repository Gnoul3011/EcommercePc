import { modals } from "@mantine/modals";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ShoppingContextProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  thumbnailUri: string;
  discount: number;
  productLine: string;
  stock: number;
};

type ProductItem = {
  id: number;
  productName: string;
  productLine: string;
  price: number;
  thumbnailUri: string;
  discount: number;
  stock: number;
};

interface ShoppingContextType {
  cartQty: number;
  totalPrice: number;
  totalDiscount: number;
  cartItems: CartItem[];
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  addCartItem: (item: ProductItem) => void;
  removeCartItem: (id: number) => void;
  clearCart: () => void;
  checkCart: (id: number, stock: number) => boolean;
}

const ShoppingContext = createContext<ShoppingContextType>(
  {} as ShoppingContextType
);

export const useShopingContext = () => {
  return useContext(ShoppingContext);
};

export const ShoppingContextProvider = ({
  children,
}: ShoppingContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const jsonCartData = localStorage.getItem("shopping_cart");
    return jsonCartData ? JSON.parse(jsonCartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartQty = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const totalDiscount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price * (item.discount / 100),
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const increaseQty = (id: number) => {
    console.log("increaseQty=> ", id);
    const currentCartItem = cartItems.find((item) => item.id === id);
    if (currentCartItem) {
      const newItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCartItems(newItems);
    }
  };

  const decreaseQty = (id: number) => {
    console.log("decreaseQty=> ", id);
    const currentCartItem = cartItems.find((item) => item.id === id);
    if (currentCartItem) {
      if (currentCartItem.quantity == 1) {
        modals.openConfirmModal({
          title: "Xác nhận",
          centered: true,
          children: <p>Bạn có muốn xóa sản phẩm này</p>,
          labels: { confirm: "Có", cancel: "Không" },
          confirmProps: { color: "red" },
          onCancel: () => {
            console.log("Cancel");
          },
          onConfirm: () => {
            {
              console.log("Confirmed");
              removeCartItem(id);
            }
          },
        });
      } else {
        const newItems = cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      }
    }
  };

  const addCartItem = (product: ProductItem) => {
    console.log("product-> ", product);
    if (product) {
      const currentCartItem = cartItems.find((item) => item.id === product.id);
      if (currentCartItem) {
        const newItems = cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        setCartItems(newItems);
      } else {
        const newItem = { ...product, quantity: 1 };
        setCartItems([...cartItems, newItem]);
      }
    }
  };

  const removeCartItem = (id: number) => {
    console.log("removeCartItem=> ", id);
    const currentCartItemIndex = cartItems.findIndex((item) => item.id === id);
    const newItems = [...cartItems];
    newItems.splice(currentCartItemIndex, 1);
    setCartItems(newItems);
  };

  const checkCart = (id: number, stock: number) => {
    const currentCartItem = cartItems.find((item) => item.id === id);
    if (currentCartItem) {
      return stock > currentCartItem.quantity
    }
    return true;
  }

  const clearCart = () => {
    console.log("removeCartItem=> ");
    setCartItems([]);
  };

  return (
    <>
      <ShoppingContext.Provider
        value={{
          cartItems,
          cartQty,
          totalPrice,
          totalDiscount,
          increaseQty,
          decreaseQty,
          removeCartItem,
          addCartItem,
          clearCart,
          checkCart
        }}
      >
        {children}
      </ShoppingContext.Provider>
    </>
  );
};
