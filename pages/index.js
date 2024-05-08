import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import {useState, useEffect} from 'react';
import axios from "axios";

export default function Home() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  const todayOrder = orders.filter(item => {
   
    console.log(new Date(item.createdAt).getMonth())

    return new Date(item.createdAt).getDate() === new Date().getDate()
  })

  console.log(todayOrder[0]?.line_items[0].price_data.unit_amount)

  const todayRevenue = todayOrder.reduce((acc,item )=> acc + item.line_items[0].price_data.unit_amount,0)
  
  console.log(todayRevenue , "undefinded")
  
  const monthOrder = orders.filter(item => new Date(item.createdAt).getMonth() === new Date().getMonth())
  const monthRevenue = monthOrder.reduce((acc,item )=> acc + item.line_items[0].price_data.unit_amount,0)
  
  function getWeekNumber(date) {
    // Copy date so don't modify original
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    let weekNumber = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNumber;
}

// Example usage
const weekOrders = orders.filter( item =>{
  let inputDate = new Date(item.createdAt); // Input your date here
let weekNumber = getWeekNumber(inputDate);
console.log("Week number:", weekNumber);
  let todayWeekNumber = getWeekNumber(new Date())
  return weekNumber === todayWeekNumber;

})

    const weekRevenue = weekOrders.reduce((acc,item )=> acc + item.line_items[0].price_data.unit_amount,0)

  

  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b> Admin</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} alt="" className="w-6 h-6" />
          <span className="px-2 uppercase">Balaji S K</span>
        </div>
      </div>
      <main>
       <div>
      <div>
      <h1>Orders</h1>
       <div className="flex gap-[10rem] ">
       <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >Today</h3>
          <h1 className="text-xl text-gray-700 font-semibold" >{todayOrder.length}</h1>
          <p className="text-gray-500">{todayOrder.length} order today</p>
        </div>
        {/* this week */}
        <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >This Week</h3>
          <h1 className="text-xl text-gray-700 font-semibold" >{weekOrders.length}</h1>
          <p className="text-gray-500">{weekOrders.length} orders this week </p>
        </div>
        {/* This month */}
        <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >This Month</h3>
          <h1 className="text-xl text-gray-700 font-semibold" >{monthOrder.length}</h1>
          <p className="text-gray-500">{monthOrder.length} orders this month</p>
        </div>
       </div>
      </div>

      {/* Revenue */}
      <div>
      <h1>Revenue</h1>
       <div className="flex gap-[10rem] ">
       <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >Today</h3>
          <h1 className="text-xl text-gray-700 font-semibold" > &#8377; {todayRevenue}</h1>
          <p className="text-gray-500">{todayOrder.length} order today</p>
        </div>
        {/* this week */}
        <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >This Week</h3>
          <h1 className="text-xl text-gray-700 font-semibold" >&#8377; {weekRevenue}</h1>
          <p className="text-gray-500">{weekOrders.length} orders this week </p>
        </div>
        {/* This month */}
        <div className="bg-white w-56 p-5 text-center rounded-md " >
          <h3 className="text-3xl font-bold" >This Month</h3>
          <h1 className="text-xl text-gray-700 font-semibold" >&#8377;  {monthRevenue}</h1>
          <p className="text-gray-500">{monthOrder.length} orders this month</p>
        </div>
       </div>
      </div>

       </div>
      </main>
    </Layout>
  );
}
