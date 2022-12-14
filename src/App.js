import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "./api";
import LocaleSelect from "./components/LocaleSelect";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import { LocaleProvider } from "./contexts/LocaleContext";
import useAsynce from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";
// import mockItems from "./mock.json";
import logoImg from "./assets/logo.png";
import ticketImg from "./assets/ticket.png";

const LIMIT = 6;

function AppSortButton({ selected, children, onClick }) {
    return (
        <button
            disabled={selected}
            className={`AppSortButton ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

function App() {
    const t = useTranslate();

    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffSet] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, loadingError, getReviewAsync] = useAsynce(getReviews);
    // const [loadingError, setLoadingError] = useState(null);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");

    const handleBestClick = () => setOrder("rating");

    const handleDelete = async (id) => {
        const result = await deleteReview(id);
        if (!result) return;

        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleLoad = useCallback(
        async (options) => {
            let result = await getReviewAsync(options);
            if (!result) return;

            // try {
            //     setIsLoading(true);
            //     setLoadingError(null);
            //     result = await getReviews(options);
            // } catch (error) {
            //     setLoadingError(error);
            //     return;
            // } finally {
            //     setIsLoading(false);
            // }

            const { reviews, paging } = result;

            if (options.offset === 0) {
                setItems(reviews);
            } else {
                setItems((prevItems) => [...prevItems, ...reviews]);
            }

            setOffSet(options.offset + reviews.length);
            setHasNext(paging.hasNext);
        },
        [getReviewAsync]
    );

    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    const handleCreateSuccess = (review) => {
        setItems((prevItems) => [review, ...prevItems]);
    };

    const handleUpdateSuccess = (review) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex(
                (item) => item.id === review.id
            );
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order, handleLoad]);

    return (
        <div className="App">
            <nav className="App-nav">
                <div className="App-nav-container">
                    <img
                        className="App-logo"
                        src={logoImg}
                        alt="MOVIDE PEDIA"
                    />
                    <LocaleSelect />
                </div>
            </nav>
            <div className="App-container">
                <div
                    className="App-ReviewForm"
                    style={{
                        backgroundImage: `url("${ticketImg}")`,
                    }}
                >
                    <ReviewForm
                        onSubmit={createReview}
                        onSubmitSuccess={handleCreateSuccess}
                    />
                </div>
                <div className="App-sorts">
                    <AppSortButton
                        selected={order === "createdAt"}
                        onClick={handleNewestClick}
                    >
                        {t("newest")}
                    </AppSortButton>
                    <AppSortButton
                        selected={order === "rating"}
                        onClick={handleBestClick}
                    >
                        {t("best")}
                    </AppSortButton>
                </div>
                <div className="App-ReviewList">
                    <ReviewList
                        items={sortedItems}
                        onDelete={handleDelete}
                        onUpdate={updateReview}
                        onUpdateSuccess={handleUpdateSuccess}
                    />
                    {hasNext ? (
                        <button
                            className="App-load-more-button"
                            disabled={isLoading}
                            onClick={handleLoadMore}
                        >
                            {t("load more")}
                        </button>
                    ) : (
                        <div className="App-load-more-button" />
                    )}
                    {loadingError?.message && (
                        <span>{loadingError.message}</span>
                    )}
                </div>
            </div>
            <footer className="App-footer">
                <div className="App-footer-container">
                    {t("terms of service")} | {t("privacy policy")}
                </div>
            </footer>
        </div>
    );
}

export default App;
