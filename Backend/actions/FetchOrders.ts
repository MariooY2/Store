import supabase from "../supabase";
interface Order {
    id: number;
    created_at: string;
    Products: any; 
    isPaid: boolean;
    Total: number;
    email: string;
  }
  
  export const fetchPaidOrders = async (): Promise<Order[] | null> => {
    try {
      // Fetch orders where isPaid is true
      const { data, error } = await supabase
        .from("Orders")
        .select()
        .eq("isPaid", true);
  
      if (error) {
        throw new Error(`Error fetching orders: ${error.message}`);
      }
      console.log(data[0].Products)
      return data ;

    } catch (err) {
      console.error("Error fetching paid orders:", err);
      return null;
    }
  };