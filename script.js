// added this section

function closeAllPopups() {
    const popups = document.querySelectorAll('.region-popup, .calendar-popup, #guestsPopup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
}

//added section end



document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const searchContainer = document.querySelector('.search-container');
    const tabContainer = document.getElementById('tabContainer');

    // Function to show the expanded search
    function showExpandedSearch() {
        searchBar.classList.add('hide');
        searchContainer.style.display = 'block';
        tabContainer.classList.add('show');
    }

    // Function to hide the expanded search
    function hideExpandedSearch() {
        searchBar.classList.remove('hide');
        searchContainer.style.display = 'none';
        tabContainer.classList.remove('show');
    }

    // Event listener for clicks on the search bar buttons
    const searchBarButtons = searchBar.querySelectorAll('button');
    searchBarButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            showExpandedSearch();
        });
    });

    // Event listener for clicks outside the search elements
    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target) && !searchBar.contains(event.target) && !tabContainer.contains(event.target)) {
            hideExpandedSearch();
        }
    });

    // Prevent clicks within the search container from closing it
    searchContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Prevent clicks within the tab container from closing the search
    tabContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Your existing setActiveTab function
    function setActiveTab(tab) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    }

    // Event listeners for tab buttons
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            setActiveTab(this);
        });
    });
});

// new feature to the photo galary feature start

document.addEventListener('DOMContentLoaded', function() {
    const showAllPhotosBtn = document.querySelector('.show-all-photos');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const closeGalleryBtn = document.getElementById('close-gallery');
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');
    const galleryImage = document.getElementById('gallery-image');
    const photoCounter = document.getElementById('photo-counter');
  
    let currentImageIndex = 0;
    const images = [
      'resources/image 1.webp',
      'resources/image 3.webp',
      'resources/image 4.webp',
      'resources/image 5.webp',
      'resources/image 6.webp'
      // Add more image paths as needed
    ];
  
    function updateGallery() {
      galleryImage.src = images[currentImageIndex];
      photoCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
      prevImageBtn.style.display = currentImageIndex === 0 ? 'none' : 'block';
      nextImageBtn.style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
    }
  
    showAllPhotosBtn.addEventListener('click', function() {
      galleryOverlay.style.display = 'block';
      updateGallery();
    });
  
    closeGalleryBtn.addEventListener('click', function() {
      galleryOverlay.style.display = 'none';
    });
  
    prevImageBtn.addEventListener('click', function() {
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateGallery();
      }
    });
  
    nextImageBtn.addEventListener('click', function() {
      if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateGallery();
      }
    });
  
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (galleryOverlay.style.display === 'block') {
        if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
          currentImageIndex--;
          updateGallery();
        } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
          currentImageIndex++;
          updateGallery();
        } else if (e.key === 'Escape') {
          galleryOverlay.style.display = 'none';
        }
      }
    });

    let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateGallery();
      }
    }
    if (touchEndX - touchStartX > 50) {
      // Swipe right
      if (currentImageIndex > 0) {
        currentImageIndex--;
        updateGallery();
      }
    }
  }

  galleryImage.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  galleryImage.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // Prevent default touch behavior to avoid scrolling while swiping
  galleryImage.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, { passive: false });


  });



// new feature to the photo galary feature end


// share button popup feature start here

document.addEventListener('DOMContentLoaded', function() {
    const shareButton = document.querySelector('.search-option-share');
    const sharePopup = document.getElementById('sharePopup');
    const closePopup = document.querySelector('.close-popup');
    const copyLinkButton = document.getElementById('copyLink');
  
    shareButton.addEventListener('click', function() {
      sharePopup.style.display = 'block';
    });
  
    closePopup.addEventListener('click', function() {
      sharePopup.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === sharePopup) {
        sharePopup.style.display = 'none';
      }
    });
  
    copyLinkButton.addEventListener('click', function() {
      const currentURL = window.location.href;
      const tempInput = document.createElement('input');
      document.body.appendChild(tempInput);
      tempInput.value = currentURL;
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard!');
    });
  });


//   save button feature start

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveButton');
    
    // Check localStorage and set initial state
    if (localStorage.getItem('heartActive') === 'true') {
      saveButton.classList.add('active');
    }
  
    saveButton.addEventListener('click', function() {
      this.classList.toggle('active');
      
      // Save state to localStorage
      localStorage.setItem('heartActive', this.classList.contains('active'));
    });
  });


// save button feature end


// share button popup feature end here



document.addEventListener('DOMContentLoaded', function () {
    const whereInput = document.querySelector('.search-item input[placeholder="Search destinations"]');
    const regionPopup = document.querySelector('.region-popup');

    whereInput.addEventListener('click', function (event) {
        event.stopPropagation();
        regionPopup.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
        if (!regionPopup.contains(event.target) && event.target !== whereInput) {
            regionPopup.style.display = 'none';
        }
    });

    // Prevent clicks within the popup from closing it
    regionPopup.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Optional: Handle region selection
    const regionItems = document.querySelectorAll('.region-item');
    regionItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedRegion = this.querySelector('span').textContent;
            whereInput.value = selectedRegion;
            regionPopup.style.display = 'none';
        });
    });
});





//   calender feature integration uptill everything ok
document.addEventListener('DOMContentLoaded', function () {
    const checkInDiv = document.querySelector('.search-item:nth-child(2)');
    const checkOutDiv = document.querySelector('.search-item:nth-child(3)');
    const calendarPopup = document.querySelector('.calendar-popup');
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthSpan = document.querySelector('.current-month');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const flexibleOptions = document.querySelectorAll('.flexible-options button');

    let currentDate = new Date();
    let selectedCheckIn = null;
    let selectedCheckOut = null;

    function showCalendar() {
        calendarPopup.style.display = 'block';
        renderCalendar();
    }

    function hideCalendar() {
        calendarPopup.style.display = 'none';
    }

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        currentMonthSpan.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        calendarGrid.innerHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => selectDate(new Date(year, month, day)));
            calendarGrid.appendChild(dayElement);
        }

        updateCalendarSelection();
    }

    function selectDate(date) {
        if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
            selectedCheckIn = date;
            selectedCheckOut = null;
        } else {
            if (date > selectedCheckIn) {
                selectedCheckOut = date;
            } else {
                selectedCheckOut = selectedCheckIn;
                selectedCheckIn = date;
            }
        }
        updateInputs();
        updateCalendarSelection();
    }

    function updateInputs() {
        const checkInInput = checkInDiv.querySelector('input');
        const checkOutInput = checkOutDiv.querySelector('input');

        if (checkInInput && selectedCheckIn) {
            checkInInput.value = formatDate(selectedCheckIn);
        }
        if (checkOutInput && selectedCheckOut) {
            checkOutInput.value = formatDate(selectedCheckOut);
        }
    }

    function updateCalendarSelection() {
        const days = calendarGrid.querySelectorAll('.calendar-day');
        days.forEach(day => {
            day.classList.remove('selected', 'in-range');
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(day.textContent));
            if (selectedCheckIn && dayDate.getTime() === selectedCheckIn.getTime()) {
                day.classList.add('selected');
            }
            if (selectedCheckOut && dayDate.getTime() === selectedCheckOut.getTime()) {
                day.classList.add('selected');
            }
            if (selectedCheckIn && selectedCheckOut && dayDate > selectedCheckIn && dayDate < selectedCheckOut) {
                day.classList.add('in-range');
            }
        });
    }

    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (checkInDiv) {
        checkInDiv.addEventListener('click', showCalendar);
    }

    if (checkOutDiv) {
        checkOutDiv.addEventListener('click', showCalendar);
    }

    document.addEventListener('click', (event) => {
        if (calendarPopup && !calendarPopup.contains(event.target) &&
            !checkInDiv.contains(event.target) &&
            !checkOutDiv.contains(event.target)) {
            hideCalendar();
        }
    });

    if (calendarPopup) {
        calendarPopup.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // Optional: Handle flexible date options
    if (flexibleOptions) {
        flexibleOptions.forEach(option => {
            option.addEventListener('click', () => {
                flexibleOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                // Here you can add logic to handle flexible date selection
            });
        });
    }

    // Initialize the calendar
    renderCalendar();
});


// calender integration end 







// guest counter feature integration start here



document.addEventListener('DOMContentLoaded', function () {
    const guestsInput = document.getElementById('guestsInput');
    const guestsPopup = document.getElementById('guestsPopup');
    const guestTypes = ['adults', 'children', 'infants', 'pets'];
    let guestCounts = {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
    };

    // Show/hide popup

    ///modified this section
    guestsInput.addEventListener('click', function (e) {
        e.stopPropagation();
        closeAllPopups();
        guestsPopup.style.display = 'block';
    });

    /// modified section end


    // added new functionality for stopping other popup to open start


    
     


    const popups = document.querySelectorAll('.region-popup, .calendar-popup, #guestsPopup');
popups.forEach(popup => {
    popup.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


    // added new functionality for stopping other popup to open end




    //modified here start

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.region-popup') && 
            !e.target.closest('.calendar-popup') && 
            !e.target.closest('#guestsPopup') && 
            !e.target.closest('.search-item')) {
            closeAllPopups();
        }
    });

    // modified end

    // Setup controls for each guest type
    guestTypes.forEach(type => {
        const incrementBtn = guestsPopup.querySelector(`.increment[data-type="${type}"]`);
        const decrementBtn = guestsPopup.querySelector(`.decrement[data-type="${type}"]`);
        const countSpan = document.getElementById(`${type}Count`);

        incrementBtn.addEventListener('click', () => updateGuestCount(type, 1));
        decrementBtn.addEventListener('click', () => updateGuestCount(type, -1));

        // Initialize button states
        updateButtonState(type);
    });

    function updateGuestCount(type, change) {
        const newCount = guestCounts[type] + change;
        if (newCount < 0) return; // Don't allow negative counts

        const totalGuests = guestCounts.adults + guestCounts.children;
        const maxGuests = 16; // Set your maximum guest limit here

        if ((type === 'adults' || type === 'children') && (totalGuests + change > maxGuests)) {
            return; // Don't exceed the maximum guest limit
        }

        guestCounts[type] = newCount;
        document.getElementById(`${type}Count`).textContent = newCount;
        updateButtonState(type);
        updateTotalGuests();
    }

    function updateButtonState(type) {
        const decrementBtn = guestsPopup.querySelector(`.decrement[data-type="${type}"]`);
        const incrementBtn = guestsPopup.querySelector(`.increment[data-type="${type}"]`);

        decrementBtn.disabled = guestCounts[type] === 0;

        const totalGuests = guestCounts.adults + guestCounts.children;
        const maxGuests = 16; // Set your maximum guest limit here

        if (type === 'adults' || type === 'children') {
            incrementBtn.disabled = totalGuests >= maxGuests;
        } else {
            incrementBtn.disabled = guestCounts[type] >= 5; // Assuming a max of 5 for infants and pets
        }
    }



    function updateTotalGuests() {
        const totalGuests = guestCounts.adults + guestCounts.children;
        let displayText = '';

        if (totalGuests > 0) {
            const guestText = totalGuests === 1 ? 'guest' : 'guests';
            displayText = `${totalGuests} ${guestText}`;

            if (guestCounts.infants > 0) {
                const infantText = guestCounts.infants === 1 ? 'infant' : 'infants';
                displayText += `, ${guestCounts.infants} ${infantText}`;
            }

            if (guestCounts.pets > 0) {
                const petText = guestCounts.pets === 1 ? 'pet' : 'pets';
                displayText += `, ${guestCounts.pets} ${petText}`;
            }
        }

        guestsInput.value = displayText;
    }
});

// guest counter feature integration end here



///clsoe feature

// Get all the necessary elements
const whereInput = document.querySelector('.search-item:nth-child(1) input');
const checkInInput = document.querySelector('.search-item:nth-child(2) input');
const checkOutInput = document.querySelector('.search-item:nth-child(3) input');
const guestsInput = document.querySelector('.search-item:nth-child(4) input');
const regionPopup = document.querySelector('.region-popup');
const calendarPopup = document.querySelector('.calendar-popup');
const guestsPopup = document.querySelector('.guests-popup');

// Function to close all popups
function closeAllPopups() {
    regionPopup.style.display = 'none';
    calendarPopup.style.display = 'none';
    guestsPopup.style.display = 'none';
}

// Function to handle "Where" input click
whereInput.addEventListener('click', function(event) {
    event.stopPropagation();
    closeAllPopups();
    regionPopup.style.display = 'block';
});

// Function to handle "Check-in" and "Check-out" input clicks
function handleDateClick(event) {
    event.stopPropagation();
    closeAllPopups();
    calendarPopup.style.display = 'block';
}

checkInInput.addEventListener('click', handleDateClick);
checkOutInput.addEventListener('click', handleDateClick);

// Function to handle "Guests" input click
guestsInput.addEventListener('click', function(event) {
    event.stopPropagation();
    closeAllPopups();
    guestsPopup.style.display = 'block';
});

// Close popups when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.search-item') && 
        !event.target.closest('.region-popup') && 
        !event.target.closest('.calendar-popup') && 
        !event.target.closest('.guests-popup')) {
        closeAllPopups();
    }
});