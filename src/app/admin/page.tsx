
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        Painel do Administrador
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo!</CardTitle>
          <CardDescription>
            Este é o seu painel de gerenciamento. Em breve, você poderá gerenciar produtos, pedidos e muito mais a partir daqui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Página em construção...</p>
        </CardContent>
      </Card>
    </div>
  );
}
