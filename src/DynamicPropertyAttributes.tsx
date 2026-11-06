import { gql } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'

const CATALOG = gql`query HostPropertyAttributes { propertyAttributeCatalog { code label description dataType visibility unitLabel } }`
const SET_VALUE = gql`mutation SetHostPropertyAttribute($input: PropertyAttributeValueInput!) { setPropertyAttributeValue(input: $input) { code valueJson valueVersion } }`
interface Attribute { code: string; label: string; description?: string | null; dataType: string; visibility: string; unitLabel?: string | null }

export function DynamicPropertyAttributes() {
  const propertyId = sessionStorage.getItem('vistay.activePropertyId')
  const { data, loading } = useQuery<{ propertyAttributeCatalog: Attribute[] }>(CATALOG, { skip: !propertyId })
  const [save, result] = useMutation(SET_VALUE)
  const [values, setValues] = useState<Record<string, string>>({})
  if (!propertyId) return null
  return <section className="rise"><div className="section-title"><div><h2>Tiêu chí căn mở rộng</h2><p>Biểu mẫu sinh từ catalog đang publish; thêm tiêu chí mới không cần phát hành lại Host Web.</p></div></div>
    {loading && <p>Đang tải catalog…</p>}
    <div className="properties">{data?.propertyAttributeCatalog.filter((item) => item.visibility !== 'ADMIN').map((attribute) => <article className="property-card" key={attribute.code}><div><small>{attribute.dataType}</small><h3>{attribute.label}</h3><p>{attribute.description}</p>
      <input aria-label={attribute.label} type={attribute.dataType === 'DATE' ? 'date' : attribute.dataType === 'INTEGER' || attribute.dataType === 'DECIMAL' ? 'number' : 'text'} value={values[attribute.code] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [attribute.code]: event.target.value }))} />
      <button disabled={result.loading || !values[attribute.code]} onClick={() => {
        const raw = values[attribute.code]
        const input: Record<string, unknown> = { propertyId, attributeCode: attribute.code, expectedVersion: '0' }
        if (attribute.dataType === 'INTEGER') input.integerValue = Number(raw)
        else if (attribute.dataType === 'DECIMAL') input.decimalValue = raw
        else if (attribute.dataType === 'DATE') input.dateValue = raw
        else input.textValue = raw
        void save({ variables: { input } })
      }}>Lưu tiêu chí</button></div></article>)}</div>
  </section>
}
