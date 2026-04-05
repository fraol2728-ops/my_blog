export default function ContactForm() {
  return (
    <form className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold text-gray-900">Request Your Free Consultation</h2>
      <p className="mt-2 text-sm text-gray-600">
        Share a few details and our team will reach out within one business day.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
          />
        </div>

        <div>
          <label htmlFor="service" className="text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            id="service"
            name="service"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
            defaultValue=""
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="installation">Solar Installation</option>
            <option value="supply">Equipment Supply</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your property and energy goals..."
            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-[#458137] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b6f2f]"
      >
        Send Message
      </button>
    </form>
  );
}
