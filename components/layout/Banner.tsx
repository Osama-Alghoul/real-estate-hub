interface BannerProps {
  title?: string;
  breadcrumb?: string;
}

export default function Banner({ title, breadcrumb }: BannerProps) {
  // Define default values if props are not provided (optional but helpful)
  const defaultTitle = "Page Title";
  const defaultBreadcrumb = "Home / Page";

  const mainTitle = title || defaultTitle;
  const breadcrumbText = breadcrumb || defaultBreadcrumb;

  return (
    <div
      className="w-full h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden bg-center bg-cover relative flex items-center justify-center text-white"
      style={{
        // 1. Adds the background image
        backgroundImage: `url(/banner/banner.jpg)`,
        // 2. Creates a dark blue overlay for better text contrast and the blue tint
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 51, 102, 0.7)", // Dark blue color (Navy/Midnight Blue)
      }}
    >
      <div className="text-center p-4">
        {/* Main Title - Uses the 'title' prop */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-1">{mainTitle}</h1>
        {/* Breadcrumb - Uses the 'breadcrumb' prop */}
        <p className="text-sm opacity-90">{breadcrumbText}</p>
      </div>
    </div>
  );
}
