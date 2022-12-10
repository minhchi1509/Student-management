import ZoomAnimate from "../Animation/ZoomAnimate"
export default function Modal({ children, className, open }) {
    const Modal = () => {
        return (
            <div className="fixed z-10">
                <div className="flex flex-col justify-center fixed inset-0 bg-black bg-opacity-50 z-[9999]">
                    <ZoomAnimate>
                        <div className={`${className} relative mx-auto`}>
                            {children}
                        </div>
                    </ZoomAnimate>
                </div>
            </div>
        )
    }
    return (
        open ? <Modal /> : null
    )
}