const Policy = () => {
  return (
    <div>
      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-6">
          <img
            src="/images/contact-us.jpeg"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-span-4 flex flex-col justify-center gap-4 text-sm text-gray-600">
          <p>
            <h1 className="bg-black p-2 text-white text-center text-3xl">
              Privacy Policy
            </h1>
            <br />
            We respect your privacy and are committed to protecting your
            personal information.
          </p>

          <p>
            We collect only the data necessary to provide and improve our
            services. Your information is never sold or misused.
          </p>

          <p>
            Appropriate security measures are in place to protect your data from
            unauthorized access.
          </p>

          <p>
            By using our services, you agree to this Privacy Policy. Updates may
            be made periodically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
