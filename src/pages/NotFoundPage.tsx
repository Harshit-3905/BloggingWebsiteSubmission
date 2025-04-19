import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="container-custom min-h-[90vh] flex flex-col items-center justify-center py-12 text-center">
      <div className="space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Looks like the page you're looking for doesn't exist or has been
            moved.
          </p>
        </div>

        <div className="bg-muted/50 border rounded-lg p-6 font-code text-left">
          <pre className="text-sm">
            <code>
              <span className="text-red-500">Error</span>: 404 Not Found
              <br />
              <span className="text-blue-500">at</span>{" "}
              <span className="text-green-500">BinaryBlogs.findPage</span>(
              <br />
              {"  "}path:{" "}
              <span className="text-yellow-500">
                "{window.location.pathname}"
              </span>
              <br />)
              <br />
              <br />
              <span className="text-purple-500">Try</span>:{" "}
              <span className="text-green-500">BinaryBlogs.redirectToHome</span>
              ()
            </code>
          </pre>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="gap-2 bg-[var(--accent-color)] text-white hover:bg-background hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] border-2 border-transparent"
          >
            <Link to="/blogs">Browse Blogs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
