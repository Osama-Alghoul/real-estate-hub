interface BannerProps {
  title?: string;
  breadcrumb?: string;
}

export default function Banner({ title, breadcrumb }: BannerProps) {
  const defaultTitle = "Page Title";
  const defaultBreadcrumb = "Home / Page";

  const mainTitle = title || defaultTitle;
  const breadcrumbText = breadcrumb || defaultBreadcrumb;

  return (
    <div
      className="w-full h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden bg-center bg-cover relative flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(/banner/banner.jpg)`,
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0, 51, 102, 0.7)",
      }}
    >
      <div className="text-center p-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-1">{mainTitle}</h1>
        <p className="text-sm opacity-90">{breadcrumbText}</p>
      </div>
    </div>
  );
}
