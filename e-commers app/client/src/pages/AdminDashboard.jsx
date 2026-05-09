import {
  Package,
  ShoppingCart,
  IndianRupee,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AdminDashboard() {

  // DEMO DATA
  const stats = [
    {
      title: "Products",
      value: 9,
      icon: <Package size={28} />,
    },
    {
      title: "Orders",
      value: 12,
      icon: <ShoppingCart size={28} />,
    },
    {
      title: "Revenue",
      value: "₹45K",
      icon: <IndianRupee size={28} />,
    },
    {
      title: "Users",
      value: 18,
      icon: <Users size={28} />,
    },
  ];

  // CHART DATA
  const salesData = [
    {
      month: "Jan",
      sales: 4000,
    },
    {
      month: "Feb",
      sales: 3000,
    },
    {
      month: "Mar",
      sales: 5000,
    },
    {
      month: "Apr",
      sales: 7000,
    },
    {
      month: "May",
      sales: 4500,
    },
    {
      month: "Jun",
      sales: 9000,
    },
  ];

  return (
    <div
      className="
        min-h-screen
        pt-32
        px-6
        pb-20
        bg-zinc-100
        dark:bg-black
        text-black
        dark:text-white
        transition-colors
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* TITLE */}
        <div className="mb-10">
          <h1
            className="
              text-5xl
              font-black
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              text-gray-500
              mt-3
            "
          >
            Analytics & Store Overview
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {stats.map((item) => (
            <div
              key={item.title}
              className="
                bg-white/70
                dark:bg-zinc-900/70
                backdrop-blur-2xl
                border
                border-white/20
                dark:border-zinc-800
                rounded-[35px]
                p-6
                shadow-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-gray-500
                    "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                      mt-3
                    "
                  >
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
                    h-16
                    w-16
                    rounded-2xl
                    bg-black
                    text-white
                    dark:bg-white
                    dark:text-black
                    flex
                    items-center
                    justify-center
                  "
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div
          className="
            mt-10
            bg-white/70
            dark:bg-zinc-900/70
            backdrop-blur-2xl
            border
            border-white/20
            dark:border-zinc-800
            rounded-[40px]
            p-8
            shadow-xl
          "
        >

          <div className="mb-8">
            <h2
              className="
                text-3xl
                font-black
              "
            >
              Sales Analytics
            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Monthly revenue overview
            </p>
          </div>

          <div className="h-100">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={salesData}>

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  radius={[12, 12, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>
    </div>
  );
}