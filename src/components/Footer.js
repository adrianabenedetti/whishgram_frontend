import React from 'react'
import "../styles/footer.css"

const Footer = () => {
  return (
    <>

		<footer className="footer-07">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12 text-center py-4">
						<h2 className="footer-heading">Wishgram</h2>
						<p className="menu">
							<a href="#">Home</a>
							<a href="#">About</a>
							<a href="#">Contact</a>
						</p>
                        <p className="menu">
							<a href="#"><i class="bi bi-instagram"></i></a>
							<a href="#">About</a>
							<a href="#">Contact</a>
						</p>

					</div>
				</div>
				<div className="row mt-5">
					<div className="col-md-12 text-center">
						<p className="copyright">
					  Copyright ©️ All rights reserved | This template is made with <i class="ion-ios-heart" aria-hidden="true"></i> by
					</p>
					</div>
				</div>
			</div>
		</footer>
        </>
  )
}

export default Footer