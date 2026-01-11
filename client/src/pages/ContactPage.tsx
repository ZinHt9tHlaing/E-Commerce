import { Headset, Mail, PhoneCall } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="col-md-6 ">
        <img
          src="/images/contact-us.jpeg"
          alt="contact-us"
          style={{ width: "100%" }}
        />
      </div>
      <div className="">
        <h1 className="bg-black p-2 text-white text-center text-3xl">
          CONTACT US
        </h1>
        <p className="text-justify my-4">
          For any inquiries or product-related information, feel free to contact
          us. Our support team is available 24/7 to assist you.
        </p>
        <div className="flex flex-col gap-3 text-muted-foreground">
          <div className="mt-3 flex items-center gap-2">
            <Mail /> : www.help@ecommerceapp.com
          </div>
          <div className="mt-3 flex items-center gap-2">
            <PhoneCall /> : 012-3456789
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Headset /> : 1800-0000-0000 (toll free)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
