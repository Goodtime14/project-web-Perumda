document.addEventListener("DOMContentLoaded", () => {
    // Tangkap semua elemen yang dibutuhkan
    const filterBtns = document.querySelectorAll(".filter-btn");
    const productItems = document.querySelectorAll(".product-item");
    const searchInput = document.getElementById("searchInput");
    const sortPrice = document.getElementById("sortPrice");
    const noResults = document.getElementById("no-results");
    const productGrid = document.getElementById("product-grid");

    // Fungsi Utama untuk Memfilter dan Mengurutkan
    function updateProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
        const sortValue = sortPrice.value;
        let visibleCount = 0;

        // 1. Ubah NodeList menjadi Array agar bisa di-sort
        let productsArray = Array.from(productItems);

        // 2. Logika Mengurutkan Harga (Sorting)
        if (sortValue === "murah") {
            productsArray.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (sortValue === "mahal") {
            productsArray.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        }

        // 3. Kembalikan ke dalam grid dengan urutan baru
        productsArray.forEach(item => productGrid.appendChild(item));

        // 4. Logika Pencarian dan Kategori (Filtering)
        productsArray.forEach(item => {
            const name = item.dataset.name.toLowerCase();
            const category = item.dataset.category;

            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = activeFilter === "semua" || category === activeFilter;

            if (matchesSearch && matchesCategory) {
                item.style.display = "block";
                setTimeout(() => item.style.opacity = "1", 50);
                visibleCount++;
            } else {
                item.style.opacity = "0";
                setTimeout(() => item.style.display = "none", 300);
            }
        });

        // 5. Tampilkan pesan jika tidak ada produk
        if (visibleCount === 0) {
            setTimeout(() => noResults.classList.remove("d-none"), 300);
        } else {
            noResults.classList.add("d-none");
        }
    }

    // Event Listener untuk Tombol Kategori
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Hapus class active dari semua tombol
            filterBtns.forEach(b => {
                b.classList.remove("btn-warning", "active", "fw-semibold", "text-dark");
                b.classList.add("btn-outline-warning", "text-muted");
            });
            // Tambahkan class active ke tombol yang diklik
            btn.classList.remove("btn-outline-warning", "text-muted");
            btn.classList.add("btn-warning", "active", "fw-semibold", "text-dark");
            
            updateProducts();
        });
    });

    // Event Listener untuk Kolom Pencarian (Ketik langsung bereaksi)
    if(searchInput) {
        searchInput.addEventListener("input", updateProducts);
    }

    // Event Listener untuk Dropdown Urutkan Harga
    if(sortPrice) {
        sortPrice.addEventListener("change", updateProducts);
    }
});// ==========================================
    // FITUR HALAMAN DETAIL PRODUK
    // ==========================================
    
    // 1. Galeri Foto Interaktif
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Ganti gambar utama
                mainImage.src = this.src;
                // Hapus efek aktif dari semua thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                // Tambahkan efek aktif ke thumbnail yang diklik
                this.classList.add('active');
            });
        });
    }

    // 2. Tombol Plus Minus Kuantitas
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const inputQty = document.getElementById('input-qty');

    if (btnMinus && btnPlus && inputQty) {
        btnMinus.addEventListener('click', () => {
            let currentValue = parseInt(inputQty.value);
            if (currentValue > 1) { // Jangan sampai kurang dari 1
                inputQty.value = currentValue - 1;
            }
        });

        btnPlus.addEventListener('click', () => {
            let currentValue = parseInt(inputQty.value);
            inputQty.value = currentValue + 1;
        });
    }
