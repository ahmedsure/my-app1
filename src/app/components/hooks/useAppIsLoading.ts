
import { useState } from "react";

const useAppIsLoading = () => {
    const [isLoading, setIsLoading] = useState(false);
    return { isLoading, setIsLoading };
}

export default useAppIsLoading;