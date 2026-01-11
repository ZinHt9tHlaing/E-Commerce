const AboutPage = () => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-6">
        <img
          src="/images/about.jpeg"
          alt="contact-us"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-span-4 flex items-center justify-center">
        <p className="text-justify max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
          accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
