import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building2, Eye, MessageSquare, TrendingUp } from "lucide-react";
import { Home, Building, Warehouse, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface DashboardStats {
  totalProperties: number;
  propertiesByType: {
    residential: number;
    commercial: number;
    industrial: number;
    retail: number;
  };
  engagement: {
    views: number;
    favorites: number;
    shares: number;
  };
  messages: {
    total: number;
    unread: number;
    requests: number;
  };
  pageHealth: number;
}

export default function DashboardPage({ name }: { name: string }) {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>({
    totalProperties: 0,
    propertiesByType: {
      residential: 0,
      commercial: 0,
      industrial: 0,
      retail: 0,
    },
    engagement: {
      views: 0,
      favorites: 0,
      shares: 0,
    },
    messages: {
      total: 0,
      unread: 0,
      requests: 0,
    },
    pageHealth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/users/${user.id}`, {
        cache: "no-store",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.stats) {
            setStats(data.stats);
          }
        })
        .catch((err) => console.error("Error fetching stats:", err))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (!stats) {
    return <div className="p-6">No dashboard data available.</div>;
  }

  const propertyTypeData = [
    {
      name: "Residential",
      count: stats.propertiesByType?.residential || 0,
      icon: Home,
      color: "bg-blue-500",
    },
    {
      name: "Commercial",
      count: stats.propertiesByType?.commercial || 0,
      icon: Building,
      color: "bg-green-500",
    },
    {
      name: "Industrial",
      count: stats.propertiesByType?.industrial || 0,
      icon: Warehouse,
      color: "bg-purple-500",
    },
    {
      name: "Retail",
      count: stats.propertiesByType?.retail || 0,
      icon: Store,
      color: "bg-orange-500",
    },
  ];
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Dashboard {name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active listings on your page
            </p>
          </CardContent>
        </Card>

        {/* Total Views */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.engagement?.views?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messages?.total || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.messages?.unread || 0} unread, {stats.messages?.requests || 0} new
              requests
            </p>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.engagement?.favorites || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Favorites & {stats.engagement?.shares || 0} shares
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Property Types & Page Health */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Property Types */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>
              Distribution of your listings by type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {propertyTypeData.map((type) => (
              <div key={type.name} className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${type.color}`}
                >
                  <type.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{type.name}</p>
                    <p className="text-sm font-bold">{type.count}</p>
                  </div>
                  <Progress
                    value={stats.totalProperties ? (type.count / stats.totalProperties) * 100 : 0}
                    className="mt-2 h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Page Health */}
        <Card>
          <CardHeader>
            <CardTitle>Page Health Score</CardTitle>
            <CardDescription>
              Overall performance of your property listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative h-40 w-40">
                  {/* Circular Progress */}
                  <svg className="h-40 w-40 -rotate-90 transform">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-secondary"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 70 * (1 - (stats.pageHealth || 0) / 100)
                      }`}
                      className="text-green-500 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold">
                        {stats.pageHealth || 0}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Excellent
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Profile Completion
                  </span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-medium">88%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Photo Quality</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Update Frequency
                  </span>
                  <span className="font-medium">78%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest property interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New inquiry for",
                property: "Modern Villa in Downtown",
                time: "2 hours ago",
              },
              {
                action: "Property viewed",
                property: "Luxury Apartment Complex",
                time: "5 hours ago",
              },
              {
                action: "Booking request for",
                property: "Commercial Office Space",
                time: "1 day ago",
              },
              {
                action: "New message about",
                property: "Warehouse District B",
                time: "2 days ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span>{" "}
                    <span className="text-muted-foreground">
                      {activity.property}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
