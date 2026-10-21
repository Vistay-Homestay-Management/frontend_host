import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight, Bell, Buildings, CalendarDots, ChartLineUp, ChatCircleDots, HouseLine, ListChecks, Wallet } from '@phosphor-icons/react'
import './App.css'

const homes = [
  { name: 'Sông Hàn Loft', model: 'Quản lý vận hành', occupancy: '87%', image: 'https://picsum.photos/seed/vistay-host-river/900/700' },
  { name: 'An Thượng Studio', model: 'Thuê bởi ViStay', occupancy: '92%', image: 'https://picsum.photos/seed/vistay-host-studio/900/700' },
]

function App() {
  const root = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.rise', { y: 28, opacity: 0, duration: .7, stagger: .08, ease: 'power3.out' })
    gsap.from('.property-card', { scale: .9, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out', delay: .25 })
  }, { scope: root })

  return (
    <main className="host-app" ref={root}>
      <aside>
        <a className="logo" href="#" aria-label="ViStay Host">ViStay<span>.</span></a>
        <nav>
          <a className="active" href="#"><HouseLine /> Tổng quan</a>
          <a href="#"><Buildings /> Căn hộ</a>
          <a href="#"><CalendarDots /> Lịch đặt</a>
          <a href="#"><Wallet /> Tài chính</a>
          <a href="#"><ListChecks /> Yêu cầu</a>
        </nav>
        <div className="host-profile"><div>NA</div><span><strong>Nguyễn An</strong><small>Chủ nhà</small></span></div>
      </aside>
      <section className="workspace">
        <header className="rise">
          <div><span>Thứ năm, 22 tháng 10</span><h1>Chào buổi sáng, anh An.</h1></div>
          <div className="header-actions"><button aria-label="Thông báo"><Bell /></button><button className="support"><ChatCircleDots /> Liên hệ quản lý</button></div>
        </header>

        <section className="metrics rise" aria-label="Chỉ số tháng này">
          <article><span>Doanh thu tháng</span><strong>84,2 triệu</strong><small><ChartLineUp /> tăng 12,4%</small></article>
          <article><span>Công suất phòng</span><strong>89,5%</strong><small>cao hơn 6,2% dự kiến</small></article>
          <article><span>Booking sắp tới</span><strong>18</strong><small>3 lượt nhận phòng hôm nay</small></article>
          <article className="dark"><span>Đối soát tiếp theo</span><strong>31.10</strong><small>Dự kiến 42,6 triệu</small></article>
        </section>

        <div className="content-grid">
          <section>
            <div className="section-title rise"><div><h2>Căn hộ của bạn</h2><p>Tình hình khai thác theo thời gian thực.</p></div><a href="#">Xem tất cả <ArrowUpRight /></a></div>
            <div className="properties">
              {homes.map((home) => <article className="property-card" key={home.name}>
                <div className="property-image"><img src={home.image} alt="" /><span>{home.occupancy} công suất</span></div>
                <div><small>{home.model}</small><h3>{home.name}</h3><p>Không có vấn đề cần xử lý</p></div>
              </article>)}
            </div>
          </section>
          <aside className="activity rise">
            <div><h2>Cần bạn xem</h2><span>2 mục</span></div>
            <article><span className="status urgent" /><div><strong>Duyệt chi phí sửa khóa</strong><p>Sông Hàn Loft · 680.000đ</p><button>Xem yêu cầu</button></div></article>
            <article><span className="status" /><div><strong>Đối soát tháng 9</strong><p>Sẵn sàng để xác nhận</p><button>Mở báo cáo</button></div></article>
            <a href="#">Xem toàn bộ hoạt động <ArrowUpRight /></a>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
