import { PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white bg-grid ">
      <div className="container max-w-6xl mx-auto py-20 px-4 mx-px-0 flex flex-wrap gap-8 md:gap-24">
        <div>
          <h4 className="text-2xl font-semibold">Address</h4>
          <p className="mt-4 max-w-sm">
            1A, Modele Compound Tejuosho Rd, Surulere Lagos
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold">Contact Me</h4>
          <div className="mt-4 flex flex-col gap-2">
            <p className="flex gap-4 items-center">
              <PhoneCallIcon size={20} /> 08155835284
            </p>
            <p className="flex gap-4 items-center">
              <Image
                src={"/whatsapp.png"}
                alt="whatsapp icon"
                width={20}
                height={20}
              />
              08089662470
            </p>
            <p className="flex gap-4 items-center">
              <Image
                src={"/gmail.png"}
                alt="whatsapp icon"
                width={20}
                height={20}
              />
              usmannurudeen13@gmail.com
            </p>
          </div>
        </div>
        <div className="">
          <h4 className="text-2xl font-semibold">Connect With Me</h4>
          <div className="mt-4 flex flex-col gap-2">
            <a href="" className="flex gap-2 items-center">
              <Image
                src={"/communication.png"}
                alt="facebook icon"
                width={20}
                height={20}
              />
              <span>Facebook</span>
            </a>
            <a
              href=""
              className="w-5 h-5 bg-white rounded flex gap-2 items-center"
            >
              <Image src={"/twitter.png"} alt="x icon" width={20} height={20} />
              <span>X</span>
            </a>
            <a href="" className="flex gap-2 items-center">
              <Image
                src={"/linkedin.png"}
                alt="linkedin icon"
                width={20}
                height={20}
              />
              <span>Linkedin</span>
            </a>
            <a href="" className="flex gap-2 items-center">
              <Image
                src={"/instagram.png"}
                alt="instagram icon"
                width={20}
                height={20}
              />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="border-t border-t-gray-200 py-4 px-4 sm:px-0">
        <div className=" container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center ">
          <div>
            <h4>Usman</h4>
          </div>
          <div> &copy; 2025 Usman Nurudeen, Software Developer</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
