import PageLayout from '../components/PageLayout'

export default function ModifiersPage() {
  return (
    <PageLayout>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">🧪 Модификаторы</h2>
        <p className="text-gray-300">
          Здесь будет система правил и ограничений для игроков.
        </p>
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">
            Компонент ModifiersTable будет создан в Этапе 1.5
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
