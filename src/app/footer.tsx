import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral p-10 text-neutral-content">
      <div className="footer m-auto max-w-7xl flex flex-wrap justify-between gap-10">
        {/* Services Section */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <span className="footer-title text-lg font-bold">Services</span>
          <Link href="#" className="link-hover link">
            Branding
          </Link>
          <Link href="#" className="link-hover link">
            Design
          </Link>
          <Link href="#" className="link-hover link">
            Marketing
          </Link>
          <Link href="#" className="link-hover link">
            Advertisement
          </Link>
        </div>

        {/* Company Section */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <span className="footer-title text-lg font-bold">Company</span>
          <Link href="#" className="link-hover link">
            About us
          </Link>
          <Link href="#" className="link-hover link">
            Contact
          </Link>
          <Link href="#" className="link-hover link">
            Jobs
          </Link>
          <Link href="#" className="link-hover link">
            Press kit
          </Link>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <span className="footer-title text-lg font-bold">Legal</span>
          <Link href="#" className="link-hover link">
            Terms of use
          </Link>
          <Link href="#" className="link-hover link">
            Privacy policy
          </Link>
          <Link href="#" className="link-hover link">
            Cookie policy
          </Link>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-10">
        <p>© {new Date().getFullYear()} Flowamon. All rights reserved.</p>
      </div>
    </footer>
  );
}
