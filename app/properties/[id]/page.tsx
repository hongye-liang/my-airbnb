import Image from "next/image";
import ReservationSidebar from "../ReservationSidebar";

const PropertyDetailPage = () => {
    return (
        <main className = "max-w-[1500px mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image
                    fill
                    src='/beach_1.jpg'
                    className="object-hover h-full w-full"
                    alt="Beach house"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property name</h1>
                    <span className="mb-6 block text-lg text-gray-600">
                        4 guests - 2 bedrooms - 1 bathroom
                    </span>

                    <hr />

                    <div className="py-6 flex items-center space-x-4">
                        <Image
                            src='/profile_pic_1.png'
                            width = {50}
                            height = {50}
                            className="rounded-full"
                            alt="user name"
                        />

                        <p><strong>Jogn Doe</strong> is your host</p>
                    </div>

                    <hr />

                    <p className="mt-6 text-lg">
                        Something interesting hdowajo dhwaoihj hoiwajoi dhaowidhjoi hdioahjdioalh
                    </p>
                </div>

                <ReservationSidebar />
            </div>
        </main>

    )
}

export default PropertyDetailPage;