const element = document.querySelector('.rg-notif');

const rgNotification = {
  show() {
    element.classList.add('rg-show');
  },
  hide() {
    element.classList.remove('rg-show');
  },
  create(settings) {
    const checkLS = localStorage.getItem('notif')
    if(checkLS) return

    const newDiv = document.createElement('div');

    const titleHTML = settings?.title?.text
      ? '<div class="rg-title' +
        (settings?.title?.color || '') +
        '">' +
        settings?.title?.text +
        '</div>'
      : ''
    
    const contentHTML = settings?.content
			? `<div class="rg-content">${settings?.content}</div>`
			: ''

    const buttons = 
      settings?.links?.length > 0
        ? settings.links
          .map(
            item => 
              `<a href="${item.href}" target="_blank" class="rg-button rg-animation ${item.color}">${item.text}</a> `
          )
          .join('')
        : ''

    const buttonsHTML =
      settings?.links?.length > 0
        ? `<div class='wrapper-button'>${buttons}</div>`
        : ''

    const ytVideos =
      settings?.ytLinks?.length > 0
        ? settings.ytLinks
            .map(
              item =>
                `<a data-fancybox href="${item.href}"><img src="${item.imageSrc}" alt="" /></a>`
            )
            .join('')
        : ''
    
    const ytThumbnailHTML =
      settings?.ytLinks?.length > 0
        ? `<div class="yt-thumnail">${ytVideos}</div>`
        : ''
  
    const iconHTML = `<i class="rg-icon ${
      settings?.mainIcon?.icon || 'ri-check-line'
      } ${settings?.mainIcon?.color || ''}"></i>`

    newDiv.innerHTML = `
			<div class="rg-notif rg-notif-error rg-show">
				<div class="rg-left">
					${iconHTML}
				</div>
				<div class="rg-right">
					${titleHTML}

					${contentHTML}

					${buttonsHTML}

					${ytThumbnailHTML}
				</div>
				<div class='rg-close'><i class='ri-close-line'></i></div>
			</div>
		`
  
    const mainElement = document.getElementById('rg-main')
		document.body.insertBefore(newDiv, mainElement)

		const closeElem = document.querySelector('.rg-close')

		closeElem.addEventListener('click', () => {
			localStorage.setItem('notif', false)
			document.querySelector('.rg-notif').classList.remove('rg-show')
		})
  }
}

window.settings = {
	mainIcon: {
		icon: 'ri-play-fill',
		color: 'rg-white',
	},
	title: {
		text: 'Новый ролик на канале!',
		color: 'white',
	},
	content:
		'Подписка на соц сети Ютуб Инст Новое видео на канале или новый пост Текст',
	// links: [
	// 	{
	// 		href: 'https://',
	// 		text: 'Наш канал',
	// 		color: 'rg-red',
	// 	},
	// 	{
	// 		href: 'https://instagram.com/',
	// 		text: 'Наша инста',
	// 		color: 'rg-purple',
	// 	},
	// ],
}

window.rgNotification = rgNotification